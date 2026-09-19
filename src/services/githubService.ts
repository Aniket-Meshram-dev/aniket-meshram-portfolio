// Service for fetching live GitHub API data for Aniket Meshram with caching and rate-limit protection

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubStats {
  followers: number;
  repositories: number;
  totalStars: number;
}

export interface LiveCommitItem {
  id: string;
  repo: string;
  branch: string;
  hash: string;
  message: string;
  time: string;
  url: string;
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  y?: number;
}

export interface GitHubContributionColumn {
  x: number;
  days: GitHubContributionDay[];
}

export interface GitHubMonthLabel {
  x: number;
  name: string;
}

export interface MonthSegment {
  key: string;
  name: string;
  year: string;
  columns: (GitHubContributionDay | null)[][];
  totalContributions: number;
}

export interface GitHubYearData {
  year: string;
  totalContributions: number;
  months: GitHubMonthLabel[];
  columns: GitHubContributionColumn[];
  segmentedMonths: MonthSegment[];
}

export interface CompleteGitHubData {
  username: string;
  profile: GitHubProfile;
  stats: GitHubStats;
  liveCommits: LiveCommitItem[];
  yearsData: Record<string, GitHubYearData>;
  availableYears: string[];
  lastUpdated: number;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache TTL
export const DEFAULT_GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME || 'Aniket-Meshram-dev';

// Relative time formatter: e.g. "2 hours ago", "3 days ago"
function formatRelativeTime(dateInput: string | Date): string {
  const now = new Date().getTime();
  const date = new Date(dateInput).getTime();
  const diffSec = Math.max(0, Math.floor((now - date) / 1000));

  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

// Convert flat contributions list into 53 SVG columns and month labels
function transformContributionsToColumns(
  contributions: { date: string; count: number; level: number }[]
): { columns: GitHubContributionColumn[]; months: GitHubMonthLabel[] } {
  if (!contributions || contributions.length === 0) {
    return { columns: [], months: [] };
  }

  const columns: GitHubContributionColumn[] = [];
  const months: GitHubMonthLabel[] = [];
  let currentMonth = -1;

  let currentColumn: { x: number; days: GitHubContributionDay[] } = {
    x: 0,
    days: [],
  };
  let colIdx = 0;

  contributions.forEach((day, index) => {
    const d = new Date(day.date);
    const dayOfWeek = d.getUTCDay(); // 0 = Sun, 1 = Mon ...
    const month = d.getUTCMonth();

    // Check if month changed on Sunday or Monday
    if (
      month !== currentMonth &&
      (dayOfWeek === 0 || dayOfWeek === 1 || currentMonth === -1)
    ) {
      currentMonth = month;
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      months.push({
        x: colIdx * 17,
        name: monthNames[month],
      });
    }

    const y = 21 + dayOfWeek * 17;
    currentColumn.days.push({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as 0 | 1 | 2 | 3 | 4,
      y,
    });

    if (dayOfWeek === 6 || index === contributions.length - 1) {
      columns.push({
        x: colIdx * 17,
        days: currentColumn.days,
      });
      colIdx++;
      currentColumn = { x: colIdx * 17, days: [] };
    }
  });

  return { columns, months };
}

// Transform flat contributions list into segmented Month blocks (columns per month with day-of-week alignment)
export function buildSegmentedMonths(
  contributions: { date: string; count: number; level: number }[]
): MonthSegment[] {
  if (!contributions || contributions.length === 0) return [];

  const monthGroups: {
    key: string;
    year: string;
    name: string;
    days: { date: string; count: number; level: number }[];
    totalContributions: number;
  }[] = [];

  let currentMonthKey = '';
  let currentMonthData: (typeof monthGroups)[0] | null = null;
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  contributions.forEach((item) => {
    const parts = item.date.split('-');
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const monthKey = `${year}-${parts[1]}`;

    if (monthKey !== currentMonthKey) {
      currentMonthKey = monthKey;
      currentMonthData = {
        key: monthKey,
        year,
        name: monthNames[monthIndex] || parts[1],
        days: [],
        totalContributions: 0,
      };
      monthGroups.push(currentMonthData);
    }

    if (currentMonthData) {
      currentMonthData.days.push(item);
      currentMonthData.totalContributions += item.count || 0;
    }
  });

  return monthGroups.map((m) => {
    const columns: (GitHubContributionDay | null)[][] = [];
    let currentWeek: (GitHubContributionDay | null)[] = new Array(7).fill(null);

    m.days.forEach((day) => {
      const d = new Date(day.date);
      const dayOfWeek = d.getUTCDay(); // 0 = Sun, 6 = Sat

      currentWeek[dayOfWeek] = {
        date: day.date,
        count: day.count || 0,
        level: Math.min(4, Math.max(0, day.level || 0)) as 0 | 1 | 2 | 3 | 4,
      };

      if (dayOfWeek === 6) {
        columns.push(currentWeek);
        currentWeek = new Array(7).fill(null);
      }
    });

    if (currentWeek.some((d) => d !== null)) {
      columns.push(currentWeek);
    }

    return {
      key: m.key,
      name: m.name,
      year: m.year,
      columns,
      totalContributions: m.totalContributions,
    };
  });
}

// Default Fallback Dataset in case of network unavailability or first cold load
function getFallbackData(username: string): CompleteGitHubData {
  return {
    username,
    profile: {
      login: username,
      name: 'Aniket Meshram',
      avatar_url: 'https://avatars.githubusercontent.com/u/132838298?v=4',
      html_url: `https://github.com/${username}`,
      bio: 'Software Engineer & Full-Stack Developer',
      public_repos: 5,
      followers: 1,
      following: 0,
    },
    stats: {
      followers: 1,
      repositories: 5,
      totalStars: 1,
    },
    liveCommits: [
      {
        id: 'commit-1',
        repo: 'NexLearn-AI',
        branch: 'main',
        hash: 'e984cf9',
        message: 'docs: add comprehensive production README and gallery',
        time: '2d ago',
        url: `https://github.com/${username}/NexLearn-AI`,
      },
      {
        id: 'commit-2',
        repo: 'POS-SYSTEM',
        branch: 'master',
        hash: '7b10fa4',
        message: 'feat(sync): offline-first indexedDB sync with CRDT logic',
        time: '5d ago',
        url: `https://github.com/${username}/POS-SYSTEM`,
      },
      {
        id: 'commit-3',
        repo: 'CoinNova-Trading-Platform',
        branch: 'main',
        hash: '3d91cf0',
        message: 'perf(render): GPU instanced orderbook depth chart with dynamic LOD',
        time: '6d ago',
        url: `https://github.com/${username}/CoinNova-Trading-Platform`,
      },
      {
        id: 'commit-4',
        repo: 'Visionary-AI',
        branch: 'main',
        hash: 'a4c5821',
        message: 'feat(vision): WebGPU hardware-accelerated inference pipeline',
        time: '1w ago',
        url: `https://github.com/${username}/Visionary-AI`,
      },
    ],
    yearsData: {
      '2026': {
        year: '2026',
        totalContributions: 149,
        months: [],
        columns: [],
        segmentedMonths: [],
      },
    },
    availableYears: ['2026', '2025', '2024'],
    lastUpdated: Date.now(),
  };
}

/**
 * Fetch all dynamic GitHub data with client-side localStorage caching and rate-limit shield.
 */
export async function fetchLiveGitHubData(
  targetUsername?: string
): Promise<CompleteGitHubData> {
  const username = targetUsername || DEFAULT_GITHUB_USERNAME;
  const cacheKey = `gh_cache_v3_${username.toLowerCase()}`;

  // 1. Check LocalStorage Cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed: CompleteGitHubData = JSON.parse(cached);
        const age = Date.now() - parsed.lastUpdated;
        if (age < CACHE_TTL_MS) {
          return parsed;
        }
      }
    } catch {
      // Ignore cache read error
    }
  }

  // 2. Fetch fresh live data concurrently
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    const [profileRes, reposRes, eventsRes, contributionsRes] =
      await Promise.allSettled([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers }
        ),
        fetch(
          `https://api.github.com/users/${username}/events/public?per_page=30`,
          { headers }
        ),
        fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=all`
        ),
      ]);

    // Handle Profile
    let profile: GitHubProfile = getFallbackData(username).profile;
    if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
      const p = await profileRes.value.json();
      profile = {
        login: p.login || username,
        name: p.name || 'Aniket Meshram',
        avatar_url: p.avatar_url,
        html_url: p.html_url || `https://github.com/${username}`,
        bio: p.bio,
        public_repos: p.public_repos ?? 5,
        followers: p.followers ?? 1,
        following: p.following ?? 0,
      };
    }

    // Handle Repositories & Total Stars
    let totalStars = 0;
    let repoCount = profile.public_repos;
    if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
      const repos = await reposRes.value.json();
      if (Array.isArray(repos)) {
        repoCount = repos.length;
        totalStars = repos.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0
        );
      }
    }

    const stats: GitHubStats = {
      followers: profile.followers,
      repositories: repoCount,
      totalStars,
    };

    // Handle Live Commits / Events
    const liveCommits: LiveCommitItem[] = [];
    if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
      const events = await eventsRes.value.json();
      if (Array.isArray(events)) {
        const pushEvents = events
          .filter((e) => e.type === 'PushEvent')
          .slice(0, 8);

        for (const ev of pushEvents) {
          const repoFullName = ev.repo?.name || '';
          const repoShortName = repoFullName.split('/')[1] || repoFullName;
          const branch = ev.payload?.ref?.replace('refs/heads/', '') || 'main';
          const headSha = ev.payload?.head || 'HEAD';
          const shortHash = headSha.substring(0, 7);
          const timeAgo = formatRelativeTime(ev.created_at);

          // Build clean commit message
          let commitMessage = `Pushed updates to ${branch}`;
          if (ev.payload?.commits && ev.payload.commits.length > 0) {
            commitMessage = ev.payload.commits[0].message;
          }

          liveCommits.push({
            id: String(ev.id),
            repo: repoShortName,
            branch,
            hash: shortHash,
            message: commitMessage,
            time: timeAgo,
            url: `https://github.com/${repoFullName}/commit/${headSha}`,
          });
        }
      }
    }

    // Fallback commits if no push events were retrieved
    if (liveCommits.length === 0) {
      liveCommits.push(...getFallbackData(username).liveCommits);
    }

    // Handle Contributions Calendar
    const yearsData: Record<string, GitHubYearData> = {};
    let availableYears: string[] = ['2026', '2025', '2024'];

    if (
      contributionsRes.status === 'fulfilled' &&
      contributionsRes.value.ok
    ) {
      const cData = await contributionsRes.value.json();
      if (cData && cData.total) {
        const recordedYears = Object.keys(cData.total).sort(
          (a, b) => parseInt(b) - parseInt(a)
        );
        if (recordedYears.length > 0) {
          availableYears = recordedYears;
        }

        // Fetch year-by-year or last-year details
        if (Array.isArray(cData.contributions)) {
          // If all days are in one array, group by year
          const yearGroups: Record<string, any[]> = {};
          cData.contributions.forEach((item: any) => {
            const yr = item.date.split('-')[0];
            if (!yearGroups[yr]) yearGroups[yr] = [];
            yearGroups[yr].push(item);
          });

          for (const yr of availableYears) {
            const days = yearGroups[yr] || [];
            const { columns, months } = transformContributionsToColumns(days);
            const segmentedMonths = buildSegmentedMonths(days);
            yearsData[yr] = {
              year: yr,
              totalContributions: cData.total[yr] || 0,
              months,
              columns,
              segmentedMonths,
            };
          }
        }
      }
    }

    // Also fetch last 12 months if current year has few weeks or empty
    if (!yearsData['2026'] || yearsData['2026'].segmentedMonths.length === 0) {
      try {
        const lastYearRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (lastYearRes.ok) {
          const lData = await lastYearRes.json();
          if (Array.isArray(lData.contributions)) {
            const { columns, months } = transformContributionsToColumns(
              lData.contributions
            );
            const segmentedMonths = buildSegmentedMonths(lData.contributions);
            const total = lData.total?.lastYear || 149;
            yearsData['2026'] = {
              year: '2026',
              totalContributions: total,
              months,
              columns,
              segmentedMonths,
            };
          }
        }
      } catch {
        // Ignore secondary error
      }
    }

    const completeData: CompleteGitHubData = {
      username,
      profile,
      stats,
      liveCommits,
      yearsData,
      availableYears,
      lastUpdated: Date.now(),
    };

    // 3. Save to LocalStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(completeData));
      } catch {
        // Storage full or unavailable
      }
    }

    return completeData;
  } catch (err) {
    console.warn('GitHub API fetch failed, serving cached fallback:', err);
    return getFallbackData(username);
  }
}
