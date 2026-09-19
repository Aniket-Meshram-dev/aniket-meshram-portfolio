// Auto-generated GitHub Heatmap & Activity Data for Aniket Meshram

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  y: number;
}

export interface HeatmapColumn {
  x: number;
  days: HeatmapDay[];
}

export interface MonthLabel {
  x: number;
  name: string;
}

export interface YearActivityData {
  year: string;
  totalContributions: number;
  months: MonthLabel[];
  columns: HeatmapColumn[];
  description: string;
}

export interface CommitPulseItem {
  id: string;
  repo: string;
  branch: string;
  hash: string;
  message: string;
  time: string;
  url: string;
}

export interface TerminalGitLogItem {
  hash: string;
  decorations: string;
  author: string;
  date: string;
  graphPrefix: string;
  message: string;
  repo: string;
}

export const HEATMAP_LEVEL_COLORS: Record<number, string> = {
  0: '#1c1c1c',
  1: '#2a1520',
  2: '#3d1f2e',
  3: '#7a3050',
  4: '#d4547e',
};

export const YEAR_DATASETS: Record<string, YearActivityData> = {
  '2026': {
  "year": "2026",
  "totalContributions": 2480,
  "months": [
    {
      "x": 0,
      "name": "Jan"
    },
    {
      "x": 68,
      "name": "Feb"
    },
    {
      "x": 136,
      "name": "Mar"
    },
    {
      "x": 221,
      "name": "Apr"
    },
    {
      "x": 289,
      "name": "May"
    },
    {
      "x": 374,
      "name": "Jun"
    },
    {
      "x": 442,
      "name": "Jul"
    },
    {
      "x": 527,
      "name": "Aug"
    },
    {
      "x": 612,
      "name": "Sep"
    },
    {
      "x": 680,
      "name": "Oct"
    },
    {
      "x": 748,
      "name": "Nov"
    },
    {
      "x": 816,
      "name": "Dec"
    }
  ],
  "columns": [
    {
      "x": 0,
      "days": [
        {
          "date": "2025-12-28",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2025-12-29",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2025-12-30",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2025-12-31",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-01-01",
          "count": 21,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-01-02",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-03",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 17,
      "days": [
        {
          "date": "2026-01-04",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-01-05",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-01-06",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-01-07",
          "count": 2,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-01-08",
          "count": 6,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-01-09",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-01-10",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 34,
      "days": [
        {
          "date": "2026-01-11",
          "count": 3,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-01-12",
          "count": 22,
          "level": 4,
          "y": 38
        },
        {
          "date": "2026-01-13",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-01-14",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-01-15",
          "count": 7,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-01-16",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-01-17",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 51,
      "days": [
        {
          "date": "2026-01-18",
          "count": 1,
          "level": 1,
          "y": 21
        },
        {
          "date": "2026-01-19",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-01-20",
          "count": 4,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-01-21",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-22",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-01-23",
          "count": 25,
          "level": 4,
          "y": 106
        },
        {
          "date": "2026-01-24",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 68,
      "days": [
        {
          "date": "2026-01-25",
          "count": 15,
          "level": 4,
          "y": 21
        },
        {
          "date": "2026-01-26",
          "count": 6,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-01-27",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2026-01-28",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-29",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-01-30",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-31",
          "count": 3,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 85,
      "days": [
        {
          "date": "2026-02-01",
          "count": 13,
          "level": 4,
          "y": 21
        },
        {
          "date": "2026-02-02",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-02-03",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2026-02-04",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-02-05",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-02-06",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-02-07",
          "count": 4,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 102,
      "days": [
        {
          "date": "2026-02-08",
          "count": 6,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-02-09",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-02-10",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-11",
          "count": 3,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-02-12",
          "count": 14,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-02-13",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-02-14",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 119,
      "days": [
        {
          "date": "2026-02-15",
          "count": 7,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-02-16",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-02-17",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-18",
          "count": 1,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-02-19",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-02-20",
          "count": 4,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-02-21",
          "count": 25,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 136,
      "days": [
        {
          "date": "2026-02-22",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-02-23",
          "count": 15,
          "level": 4,
          "y": 38
        },
        {
          "date": "2026-02-24",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-25",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-02-26",
          "count": 6,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-02-27",
          "count": 3,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-02-28",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 153,
      "days": [
        {
          "date": "2026-03-01",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-03-02",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-03-03",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-03-04",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-03-05",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-03-06",
          "count": 3,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-03-07",
          "count": 7,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 170,
      "days": [
        {
          "date": "2026-03-08",
          "count": 3,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-03-09",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-10",
          "count": 4,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-03-11",
          "count": 17,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-03-12",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-03-13",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-03-14",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 187,
      "days": [
        {
          "date": "2026-03-15",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-03-16",
          "count": 6,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-17",
          "count": 2,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-03-18",
          "count": 6,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-03-19",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-03-20",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-03-21",
          "count": 3,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 204,
      "days": [
        {
          "date": "2026-03-22",
          "count": 20,
          "level": 4,
          "y": 21
        },
        {
          "date": "2026-03-23",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-24",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2026-03-25",
          "count": 7,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-03-26",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-03-27",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-03-28",
          "count": 4,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 221,
      "days": [
        {
          "date": "2026-03-29",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-03-30",
          "count": 4,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-03-31",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-01",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-02",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-04-03",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-04-04",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 238,
      "days": [
        {
          "date": "2026-04-05",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-04-06",
          "count": 3,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-04-07",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-08",
          "count": 3,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-04-09",
          "count": 19,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-04-10",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-04-11",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 255,
      "days": [
        {
          "date": "2026-04-12",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-04-13",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-04-14",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-15",
          "count": 2,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-04-16",
          "count": 6,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-04-17",
          "count": 4,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-04-18",
          "count": 6,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 272,
      "days": [
        {
          "date": "2026-04-19",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-04-20",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-04-21",
          "count": 3,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-04-22",
          "count": 12,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-04-23",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-04-24",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-04-25",
          "count": 7,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 289,
      "days": [
        {
          "date": "2026-04-26",
          "count": 1,
          "level": 1,
          "y": 21
        },
        {
          "date": "2026-04-27",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-04-28",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-04-29",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-30",
          "count": 4,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-05-01",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-05-02",
          "count": 20,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 306,
      "days": [
        {
          "date": "2026-05-03",
          "count": 3,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-05-04",
          "count": 12,
          "level": 4,
          "y": 38
        },
        {
          "date": "2026-05-05",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-05-06",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-05-07",
          "count": 7,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-08",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-05-09",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 323,
      "days": [
        {
          "date": "2026-05-10",
          "count": 1,
          "level": 1,
          "y": 21
        },
        {
          "date": "2026-05-11",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-05-12",
          "count": 4,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-05-13",
          "count": 21,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-05-14",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-15",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-05-16",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 340,
      "days": [
        {
          "date": "2026-05-17",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-05-18",
          "count": 6,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-05-19",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-05-20",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-05-21",
          "count": 3,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-05-22",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-05-23",
          "count": 3,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 357,
      "days": [
        {
          "date": "2026-05-24",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-05-25",
          "count": 4,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-05-26",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2026-05-27",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-05-28",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-05-29",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-05-30",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 374,
      "days": [
        {
          "date": "2026-05-31",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-01",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-06-02",
          "count": 12,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-06-03",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-06-04",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-06-05",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-06-06",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 391,
      "days": [
        {
          "date": "2026-06-07",
          "count": 7,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-08",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-06-09",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-06-10",
          "count": 3,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-06-11",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-06-12",
          "count": 4,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-06-13",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 408,
      "days": [
        {
          "date": "2026-06-14",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-15",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-06-16",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-06-17",
          "count": 2,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-06-18",
          "count": 6,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-06-19",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-06-20",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 425,
      "days": [
        {
          "date": "2026-06-21",
          "count": 3,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-06-22",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-23",
          "count": 3,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-06-24",
          "count": 14,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-06-25",
          "count": 7,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-06-26",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-06-27",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 442,
      "days": [
        {
          "date": "2026-06-28",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-06-29",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-30",
          "count": 2,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-07-01",
          "count": 5,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-07-02",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-07-03",
          "count": 3,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-07-04",
          "count": 22,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 459,
      "days": [
        {
          "date": "2026-07-05",
          "count": 3,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-07-06",
          "count": 14,
          "level": 4,
          "y": 38
        },
        {
          "date": "2026-07-07",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-07-08",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-07-09",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-07-10",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-07-11",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 476,
      "days": [
        {
          "date": "2026-07-12",
          "count": 2,
          "level": 1,
          "y": 21
        },
        {
          "date": "2026-07-13",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-07-14",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-07-15",
          "count": 25,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-07-16",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-07-17",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-07-18",
          "count": 6,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 493,
      "days": [
        {
          "date": "2026-07-19",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-07-20",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-07-21",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-07-22",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-23",
          "count": 3,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-07-24",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-07-25",
          "count": 4,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 510,
      "days": [
        {
          "date": "2026-07-26",
          "count": 6,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-07-27",
          "count": 4,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-07-28",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2026-07-29",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-30",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-07-31",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-01",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 527,
      "days": [
        {
          "date": "2026-08-02",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-08-03",
          "count": 3,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-08-04",
          "count": 14,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-08-05",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-08-06",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-08-07",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-08",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 544,
      "days": [
        {
          "date": "2026-08-09",
          "count": 7,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-08-10",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-08-11",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-08-12",
          "count": 4,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-08-13",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-14",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-08-15",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 561,
      "days": [
        {
          "date": "2026-08-16",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-08-17",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-08-18",
          "count": 6,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-08-19",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-08-20",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-21",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-08-22",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 578,
      "days": [
        {
          "date": "2026-08-23",
          "count": 3,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-08-24",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-08-25",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-08-26",
          "count": 19,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-08-27",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-28",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-08-29",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 595,
      "days": [
        {
          "date": "2026-08-30",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-08-31",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-09-01",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-09-02",
          "count": 17,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-09-03",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-09-04",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-09-05",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 612,
      "days": [
        {
          "date": "2026-09-06",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-09-07",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-09-08",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-09-09",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-09-10",
          "count": 4,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-09-11",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-09-12",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 629,
      "days": [
        {
          "date": "2026-09-13",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-09-14",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-09-15",
          "count": 22,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-09-16",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-09-17",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-09-18",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-09-19",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 646,
      "days": [
        {
          "date": "2026-09-20",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-09-21",
          "count": 3,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-09-22",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-09-23",
          "count": 4,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-09-24",
          "count": 19,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-09-25",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-09-26",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 663,
      "days": [
        {
          "date": "2026-09-27",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-09-28",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-09-29",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-09-30",
          "count": 2,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-10-01",
          "count": 3,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-10-02",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-10-03",
          "count": 6,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 680,
      "days": [
        {
          "date": "2026-10-04",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-10-05",
          "count": 4,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-10-06",
          "count": 19,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-10-07",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-10-08",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-10-09",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-10-10",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 697,
      "days": [
        {
          "date": "2026-10-11",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-10-12",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-10-13",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-10-14",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-10-15",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-10-16",
          "count": 6,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-10-17",
          "count": 20,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 714,
      "days": [
        {
          "date": "2026-10-18",
          "count": 4,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-10-19",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-10-20",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-10-21",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-10-22",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-10-23",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-10-24",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 731,
      "days": [
        {
          "date": "2026-10-25",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-10-26",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-10-27",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-10-28",
          "count": 21,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-10-29",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-10-30",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-10-31",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 748,
      "days": [
        {
          "date": "2026-11-01",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2026-11-02",
          "count": 7,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-11-03",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-11-04",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-11-05",
          "count": 4,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-11-06",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2026-11-07",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 765,
      "days": [
        {
          "date": "2026-11-08",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2026-11-09",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-11-10",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-11-11",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-11-12",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2026-11-13",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-11-14",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 782,
      "days": [
        {
          "date": "2026-11-15",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-11-16",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-11-17",
          "count": 26,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-11-18",
          "count": 7,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-11-19",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-11-20",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-11-21",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 799,
      "days": [
        {
          "date": "2026-11-22",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-11-23",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-11-24",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-11-25",
          "count": 5,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-11-26",
          "count": 21,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-11-27",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-11-28",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 816,
      "days": [
        {
          "date": "2026-11-29",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-11-30",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-12-01",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2026-12-02",
          "count": 7,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-12-03",
          "count": 3,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-12-04",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-12-05",
          "count": 4,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 833,
      "days": [
        {
          "date": "2026-12-06",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-12-07",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-12-08",
          "count": 21,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-12-09",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-12-10",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2026-12-11",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-12-12",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 850,
      "days": [
        {
          "date": "2026-12-13",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-12-14",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2026-12-15",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-12-16",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2026-12-17",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-12-18",
          "count": 4,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-12-19",
          "count": 24,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 867,
      "days": [
        {
          "date": "2026-12-20",
          "count": 4,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-12-21",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-12-22",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-12-23",
          "count": 1,
          "level": 1,
          "y": 72
        },
        {
          "date": "2026-12-24",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-12-25",
          "count": 2,
          "level": 1,
          "y": 106
        },
        {
          "date": "2026-12-26",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 884,
      "days": [
        {
          "date": "2026-12-27",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-12-28",
          "count": 7,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-12-29",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-12-30",
          "count": 25,
          "level": 4,
          "y": 72
        },
        {
          "date": "2026-12-31",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2027-01-01",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2027-01-02",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    }
  ],
  "description": "contributions in 2026"
},
  '2025': {
  "year": "2025",
  "totalContributions": 3523,
  "months": [
    {
      "x": 0,
      "name": "Sep"
    },
    {
      "x": 51,
      "name": "Oct"
    },
    {
      "x": 119,
      "name": "Nov"
    },
    {
      "x": 204,
      "name": "Dec"
    },
    {
      "x": 272,
      "name": "Jan"
    },
    {
      "x": 340,
      "name": "Feb"
    },
    {
      "x": 408,
      "name": "Mar"
    },
    {
      "x": 493,
      "name": "Apr"
    },
    {
      "x": 561,
      "name": "May"
    },
    {
      "x": 646,
      "name": "Jun"
    },
    {
      "x": 714,
      "name": "Jul"
    },
    {
      "x": 782,
      "name": "Aug"
    }
  ],
  "columns": [
    {
      "x": 0,
      "days": [
        {
          "date": "2025-09-14",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-09-15",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2025-09-16",
          "count": 23,
          "level": 4,
          "y": 55
        },
        {
          "date": "2025-09-17",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2025-09-18",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-09-19",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-09-20",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 17,
      "days": [
        {
          "date": "2025-09-21",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-09-22",
          "count": 13,
          "level": 3,
          "y": 38
        },
        {
          "date": "2025-09-23",
          "count": 14,
          "level": 4,
          "y": 55
        },
        {
          "date": "2025-09-24",
          "count": 17,
          "level": 4,
          "y": 72
        },
        {
          "date": "2025-09-25",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-09-26",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-09-27",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 34,
      "days": [
        {
          "date": "2025-09-28",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2025-09-29",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2025-09-30",
          "count": 13,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-10-01",
          "count": 4,
          "level": 2,
          "y": 72
        },
        {
          "date": "2025-10-02",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2025-10-03",
          "count": 2,
          "level": 1,
          "y": 106
        },
        {
          "date": "2025-10-04",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 51,
      "days": [
        {
          "date": "2025-10-05",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2025-10-06",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2025-10-07",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2025-10-08",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2025-10-09",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2025-10-10",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2025-10-11",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 68,
      "days": [
        {
          "date": "2025-10-12",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2025-10-13",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2025-10-14",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2025-10-15",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2025-10-16",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2025-10-17",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2025-10-18",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 85,
      "days": [
        {
          "date": "2025-10-19",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2025-10-20",
          "count": 3,
          "level": 1,
          "y": 38
        },
        {
          "date": "2025-10-21",
          "count": 2,
          "level": 1,
          "y": 55
        },
        {
          "date": "2025-10-22",
          "count": 1,
          "level": 1,
          "y": 72
        },
        {
          "date": "2025-10-23",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2025-10-24",
          "count": 4,
          "level": 2,
          "y": 106
        },
        {
          "date": "2025-10-25",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 102,
      "days": [
        {
          "date": "2025-10-26",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2025-10-27",
          "count": 4,
          "level": 2,
          "y": 38
        },
        {
          "date": "2025-10-28",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-10-29",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2025-10-30",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-10-31",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-11-01",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 119,
      "days": [
        {
          "date": "2025-11-02",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-11-03",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2025-11-04",
          "count": 4,
          "level": 2,
          "y": 55
        },
        {
          "date": "2025-11-05",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2025-11-06",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2025-11-07",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2025-11-08",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 136,
      "days": [
        {
          "date": "2025-11-09",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-11-10",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2025-11-11",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-11-12",
          "count": 4,
          "level": 2,
          "y": 72
        },
        {
          "date": "2025-11-13",
          "count": 20,
          "level": 4,
          "y": 89
        },
        {
          "date": "2025-11-14",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2025-11-15",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 153,
      "days": [
        {
          "date": "2025-11-16",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2025-11-17",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2025-11-18",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2025-11-19",
          "count": 5,
          "level": 2,
          "y": 72
        },
        {
          "date": "2025-11-20",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-11-21",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-11-22",
          "count": 4,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 170,
      "days": [
        {
          "date": "2025-11-23",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-11-24",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2025-11-25",
          "count": 24,
          "level": 4,
          "y": 55
        },
        {
          "date": "2025-11-26",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2025-11-27",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-11-28",
          "count": 17,
          "level": 4,
          "y": 106
        },
        {
          "date": "2025-11-29",
          "count": 20,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 187,
      "days": [
        {
          "date": "2025-11-30",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-12-01",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2025-12-02",
          "count": 4,
          "level": 2,
          "y": 55
        },
        {
          "date": "2025-12-03",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2025-12-04",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-12-05",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-12-06",
          "count": 6,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 204,
      "days": [
        {
          "date": "2025-12-07",
          "count": 21,
          "level": 4,
          "y": 21
        },
        {
          "date": "2025-12-08",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2025-12-09",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-12-10",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2025-12-11",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2025-12-12",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-12-13",
          "count": 23,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 221,
      "days": [
        {
          "date": "2025-12-14",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2025-12-15",
          "count": 27,
          "level": 4,
          "y": 38
        },
        {
          "date": "2025-12-16",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-12-17",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2025-12-18",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2025-12-19",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-12-20",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 238,
      "days": [
        {
          "date": "2025-12-21",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-12-22",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2025-12-23",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-12-24",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2025-12-25",
          "count": 27,
          "level": 4,
          "y": 89
        },
        {
          "date": "2025-12-26",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2025-12-27",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 255,
      "days": [
        {
          "date": "2025-12-28",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2025-12-29",
          "count": 13,
          "level": 3,
          "y": 38
        },
        {
          "date": "2025-12-30",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2025-12-31",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-01",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-01-02",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-03",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 272,
      "days": [
        {
          "date": "2026-01-04",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-01-05",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-01-06",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-01-07",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-08",
          "count": 25,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-01-09",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-10",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 289,
      "days": [
        {
          "date": "2026-01-11",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-01-12",
          "count": 21,
          "level": 4,
          "y": 38
        },
        {
          "date": "2026-01-13",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-01-14",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-15",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-01-16",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-17",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 306,
      "days": [
        {
          "date": "2026-01-18",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-01-19",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-01-20",
          "count": 13,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-01-21",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-22",
          "count": 13,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-01-23",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-24",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 323,
      "days": [
        {
          "date": "2026-01-25",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-01-26",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-01-27",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-01-28",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-01-29",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2026-01-30",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-01-31",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 340,
      "days": [
        {
          "date": "2026-02-01",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-02-02",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2026-02-03",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-04",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-02-05",
          "count": 13,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-02-06",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-02-07",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 357,
      "days": [
        {
          "date": "2026-02-08",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-02-09",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-02-10",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-11",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-02-12",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-02-13",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-02-14",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 374,
      "days": [
        {
          "date": "2026-02-15",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-02-16",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-02-17",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-18",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-02-19",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-02-20",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-02-21",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 391,
      "days": [
        {
          "date": "2026-02-22",
          "count": 4,
          "level": 2,
          "y": 21
        },
        {
          "date": "2026-02-23",
          "count": 13,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-02-24",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-02-25",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-02-26",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-02-27",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-02-28",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 408,
      "days": [
        {
          "date": "2026-03-01",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-03-02",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-03",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2026-03-04",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-03-05",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-03-06",
          "count": 25,
          "level": 4,
          "y": 106
        },
        {
          "date": "2026-03-07",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 425,
      "days": [
        {
          "date": "2026-03-08",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-03-09",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-10",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-03-11",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-03-12",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-03-13",
          "count": 14,
          "level": 4,
          "y": 106
        },
        {
          "date": "2026-03-14",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 442,
      "days": [
        {
          "date": "2026-03-15",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-03-16",
          "count": 13,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-17",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-03-18",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-03-19",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-03-20",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-03-21",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 459,
      "days": [
        {
          "date": "2026-03-22",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-03-23",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-24",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-03-25",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2026-03-26",
          "count": 13,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-03-27",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-03-28",
          "count": 4,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 476,
      "days": [
        {
          "date": "2026-03-29",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-03-30",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-03-31",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-01",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-02",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-04-03",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-04-04",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 493,
      "days": [
        {
          "date": "2026-04-05",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-04-06",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-04-07",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-08",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-09",
          "count": 13,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-04-10",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-04-11",
          "count": 13,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 510,
      "days": [
        {
          "date": "2026-04-12",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-04-13",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-04-14",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-15",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-16",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-04-17",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-04-18",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 527,
      "days": [
        {
          "date": "2026-04-19",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-04-20",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-04-21",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-22",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-23",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-04-24",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-04-25",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 544,
      "days": [
        {
          "date": "2026-04-26",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-04-27",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2026-04-28",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-04-29",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-04-30",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-01",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-05-02",
          "count": 13,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 561,
      "days": [
        {
          "date": "2026-05-03",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-05-04",
          "count": 13,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-05-05",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2026-05-06",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-05-07",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-08",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-05-09",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 578,
      "days": [
        {
          "date": "2026-05-10",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-05-11",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-05-12",
          "count": 13,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-05-13",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-05-14",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-15",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2026-05-16",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 595,
      "days": [
        {
          "date": "2026-05-17",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-05-18",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-05-19",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-05-20",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-05-21",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-22",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-05-23",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 612,
      "days": [
        {
          "date": "2026-05-24",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-05-25",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-05-26",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-05-27",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-05-28",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-05-29",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-05-30",
          "count": 13,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 629,
      "days": [
        {
          "date": "2026-05-31",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-01",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-02",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-06-03",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-06-04",
          "count": 7,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-06-05",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-06-06",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 646,
      "days": [
        {
          "date": "2026-06-07",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-08",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-09",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-06-10",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-06-11",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-06-12",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-06-13",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 663,
      "days": [
        {
          "date": "2026-06-14",
          "count": 7,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-15",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-16",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-06-17",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-06-18",
          "count": 21,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-06-19",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-06-20",
          "count": 9,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 680,
      "days": [
        {
          "date": "2026-06-21",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-22",
          "count": 7,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-23",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-06-24",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-06-25",
          "count": 12,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-06-26",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-06-27",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 697,
      "days": [
        {
          "date": "2026-06-28",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-06-29",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-06-30",
          "count": 25,
          "level": 4,
          "y": 55
        },
        {
          "date": "2026-07-01",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-02",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-07-03",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-07-04",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 714,
      "days": [
        {
          "date": "2026-07-05",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-07-06",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-07-07",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-07-08",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-09",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-07-10",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-07-11",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 731,
      "days": [
        {
          "date": "2026-07-12",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-07-13",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-07-14",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-07-15",
          "count": 7,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-16",
          "count": 18,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-07-17",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-07-18",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 748,
      "days": [
        {
          "date": "2026-07-19",
          "count": 25,
          "level": 4,
          "y": 21
        },
        {
          "date": "2026-07-20",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-07-21",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-07-22",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-23",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-07-24",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-07-25",
          "count": 7,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 765,
      "days": [
        {
          "date": "2026-07-26",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-07-27",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-07-28",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-07-29",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-07-30",
          "count": 26,
          "level": 4,
          "y": 89
        },
        {
          "date": "2026-07-31",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-01",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 782,
      "days": [
        {
          "date": "2026-08-02",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-08-03",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-08-04",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-08-05",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-08-06",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-07",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-08",
          "count": 7,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 799,
      "days": [
        {
          "date": "2026-08-09",
          "count": 14,
          "level": 4,
          "y": 21
        },
        {
          "date": "2026-08-10",
          "count": 7,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-08-11",
          "count": 12,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-08-12",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-08-13",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-14",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-15",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 816,
      "days": [
        {
          "date": "2026-08-16",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-08-17",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-08-18",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-08-19",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-08-20",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-21",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-22",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 833,
      "days": [
        {
          "date": "2026-08-23",
          "count": 24,
          "level": 4,
          "y": 21
        },
        {
          "date": "2026-08-24",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-08-25",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-08-26",
          "count": 7,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-08-27",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-08-28",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-08-29",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 850,
      "days": [
        {
          "date": "2026-08-30",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-08-31",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-09-01",
          "count": 7,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-09-02",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-09-03",
          "count": 7,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-09-04",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-09-05",
          "count": 11,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 867,
      "days": [
        {
          "date": "2026-09-06",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-09-07",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-09-08",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-09-09",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-09-10",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2026-09-11",
          "count": 7,
          "level": 3,
          "y": 106
        },
        {
          "date": "2026-09-12",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 884,
      "days": [
        {
          "date": "2026-09-13",
          "count": 7,
          "level": 3,
          "y": 21
        },
        {
          "date": "2026-09-14",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2026-09-15",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2026-09-16",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2026-09-17",
          "count": 9,
          "level": 3,
          "y": 89
        }
      ]
    }
  ],
  "description": "contributions in 2025"
},
  '2024': {
  "year": "2024",
  "totalContributions": 1940,
  "months": [
    {
      "x": 0,
      "name": "Jan"
    },
    {
      "x": 68,
      "name": "Feb"
    },
    {
      "x": 136,
      "name": "Mar"
    },
    {
      "x": 221,
      "name": "Apr"
    },
    {
      "x": 289,
      "name": "May"
    },
    {
      "x": 374,
      "name": "Jun"
    },
    {
      "x": 442,
      "name": "Jul"
    },
    {
      "x": 527,
      "name": "Aug"
    },
    {
      "x": 612,
      "name": "Sep"
    },
    {
      "x": 680,
      "name": "Oct"
    },
    {
      "x": 748,
      "name": "Nov"
    },
    {
      "x": 816,
      "name": "Dec"
    }
  ],
  "columns": [
    {
      "x": 0,
      "days": [
        {
          "date": "2023-12-31",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-01-01",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-01-02",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-01-03",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-01-04",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-01-05",
          "count": 7,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-01-06",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 17,
      "days": [
        {
          "date": "2024-01-07",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-01-08",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-01-09",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-01-10",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-01-11",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-01-12",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-01-13",
          "count": 13,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 34,
      "days": [
        {
          "date": "2024-01-14",
          "count": 2,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-01-15",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-01-16",
          "count": 2,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-01-17",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-01-18",
          "count": 7,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-01-19",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-01-20",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 51,
      "days": [
        {
          "date": "2024-01-21",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-01-22",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-01-23",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-01-24",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-01-25",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-01-26",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-01-27",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 68,
      "days": [
        {
          "date": "2024-01-28",
          "count": 20,
          "level": 4,
          "y": 21
        },
        {
          "date": "2024-01-29",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-01-30",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-01-31",
          "count": 7,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-02-01",
          "count": 3,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-02-02",
          "count": 12,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-02-03",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 85,
      "days": [
        {
          "date": "2024-02-04",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-02-05",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-02-06",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-02-07",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-02-08",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-02-09",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-02-10",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 102,
      "days": [
        {
          "date": "2024-02-11",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-02-12",
          "count": 3,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-02-13",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-02-14",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-02-15",
          "count": 15,
          "level": 4,
          "y": 89
        },
        {
          "date": "2024-02-16",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-02-17",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 119,
      "days": [
        {
          "date": "2024-02-18",
          "count": 6,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-02-19",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-02-20",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-02-21",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-02-22",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-02-23",
          "count": 2,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-02-24",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 136,
      "days": [
        {
          "date": "2024-02-25",
          "count": 2,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-02-26",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-02-27",
          "count": 7,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-02-28",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-02-29",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-03-01",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-03-02",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 153,
      "days": [
        {
          "date": "2024-03-03",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-03-04",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-03-05",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-03-06",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-03-07",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-03-08",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-03-09",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 170,
      "days": [
        {
          "date": "2024-03-10",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-03-11",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-03-12",
          "count": 22,
          "level": 4,
          "y": 55
        },
        {
          "date": "2024-03-13",
          "count": 7,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-03-14",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-03-15",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-03-16",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 187,
      "days": [
        {
          "date": "2024-03-17",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-03-18",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-03-19",
          "count": 9,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-03-20",
          "count": 1,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-03-21",
          "count": 13,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-03-22",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-03-23",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 204,
      "days": [
        {
          "date": "2024-03-24",
          "count": 6,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-03-25",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-03-26",
          "count": 7,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-03-27",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-03-28",
          "count": 10,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-03-29",
          "count": 2,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-03-30",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 221,
      "days": [
        {
          "date": "2024-03-31",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-04-01",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-04-02",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-04-03",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-04-04",
          "count": 7,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-04-05",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-04-06",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 238,
      "days": [
        {
          "date": "2024-04-07",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-04-08",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-04-09",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-04-10",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-04-11",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-04-12",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-04-13",
          "count": 6,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 255,
      "days": [
        {
          "date": "2024-04-14",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-04-15",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-04-16",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-04-17",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-04-18",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-04-19",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-04-20",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 272,
      "days": [
        {
          "date": "2024-04-21",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-04-22",
          "count": 7,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-04-23",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-04-24",
          "count": 5,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-04-25",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-04-26",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-04-27",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 289,
      "days": [
        {
          "date": "2024-04-28",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-04-29",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-04-30",
          "count": 10,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-05-01",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-05-02",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-05-03",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-05-04",
          "count": 6,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 306,
      "days": [
        {
          "date": "2024-05-05",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-05-06",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-05-07",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-05-08",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-05-09",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-05-10",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-05-11",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 323,
      "days": [
        {
          "date": "2024-05-12",
          "count": 8,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-05-13",
          "count": 3,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-05-14",
          "count": 16,
          "level": 4,
          "y": 55
        },
        {
          "date": "2024-05-15",
          "count": 5,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-05-16",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-05-17",
          "count": 5,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-05-18",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 340,
      "days": [
        {
          "date": "2024-05-19",
          "count": 6,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-05-20",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-05-21",
          "count": 13,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-05-22",
          "count": 2,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-05-23",
          "count": 13,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-05-24",
          "count": 6,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-05-25",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 357,
      "days": [
        {
          "date": "2024-05-26",
          "count": 7,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-05-27",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-05-28",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-05-29",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-05-30",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-05-31",
          "count": 3,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-06-01",
          "count": 25,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 374,
      "days": [
        {
          "date": "2024-06-02",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-06-03",
          "count": 15,
          "level": 4,
          "y": 38
        },
        {
          "date": "2024-06-04",
          "count": 7,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-06-05",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-06-06",
          "count": 5,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-06-07",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-06-08",
          "count": 8,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 391,
      "days": [
        {
          "date": "2024-06-09",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-06-10",
          "count": 12,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-06-11",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-06-12",
          "count": 10,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-06-13",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-06-14",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-06-15",
          "count": 6,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 408,
      "days": [
        {
          "date": "2024-06-16",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-06-17",
          "count": 7,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-06-18",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-06-19",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-06-20",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-06-21",
          "count": 11,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-06-22",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 425,
      "days": [
        {
          "date": "2024-06-23",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-06-24",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-06-25",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-06-26",
          "count": 5,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-06-27",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-06-28",
          "count": 6,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-06-29",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 442,
      "days": [
        {
          "date": "2024-06-30",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-07-01",
          "count": 9,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-07-02",
          "count": 1,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-07-03",
          "count": 13,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-07-04",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-07-05",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-07-06",
          "count": 6,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 459,
      "days": [
        {
          "date": "2024-07-07",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-07-08",
          "count": 7,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-07-09",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-07-10",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-07-11",
          "count": 3,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-07-12",
          "count": 8,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-07-13",
          "count": 3,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 476,
      "days": [
        {
          "date": "2024-07-14",
          "count": 12,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-07-15",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-07-16",
          "count": 24,
          "level": 4,
          "y": 55
        },
        {
          "date": "2024-07-17",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-07-18",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-07-19",
          "count": 6,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-07-20",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 493,
      "days": [
        {
          "date": "2024-07-21",
          "count": 7,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-07-22",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-07-23",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-07-24",
          "count": 2,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-07-25",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-07-26",
          "count": 7,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-07-27",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 510,
      "days": [
        {
          "date": "2024-07-28",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-07-29",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-07-30",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-07-31",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-08-01",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-08-02",
          "count": 3,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-08-03",
          "count": 17,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 527,
      "days": [
        {
          "date": "2024-08-04",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-08-05",
          "count": 23,
          "level": 4,
          "y": 38
        },
        {
          "date": "2024-08-06",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-08-07",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-08-08",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-08-09",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-08-10",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 544,
      "days": [
        {
          "date": "2024-08-11",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-08-12",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-08-13",
          "count": 2,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-08-14",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-08-15",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-08-16",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-08-17",
          "count": 7,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 561,
      "days": [
        {
          "date": "2024-08-18",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-08-19",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-08-20",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-08-21",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-08-22",
          "count": 3,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-08-23",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-08-24",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 578,
      "days": [
        {
          "date": "2024-08-25",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-08-26",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-08-27",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-08-28",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-08-29",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-08-30",
          "count": 7,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-08-31",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 595,
      "days": [
        {
          "date": "2024-09-01",
          "count": 9,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-09-02",
          "count": 1,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-09-03",
          "count": 13,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-09-04",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-09-05",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-09-06",
          "count": 7,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-09-07",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 612,
      "days": [
        {
          "date": "2024-09-08",
          "count": 7,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-09-09",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-09-10",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-09-11",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-09-12",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-09-13",
          "count": 3,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-09-14",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 629,
      "days": [
        {
          "date": "2024-09-15",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-09-16",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-09-17",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-09-18",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-09-19",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-09-20",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-09-21",
          "count": 13,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 646,
      "days": [
        {
          "date": "2024-09-22",
          "count": 2,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-09-23",
          "count": 11,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-09-24",
          "count": 2,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-09-25",
          "count": 21,
          "level": 4,
          "y": 72
        },
        {
          "date": "2024-09-26",
          "count": 7,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-09-27",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-09-28",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 663,
      "days": [
        {
          "date": "2024-09-29",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-09-30",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-10-01",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-10-02",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-10-03",
          "count": 9,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-10-04",
          "count": 3,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-10-05",
          "count": 25,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 680,
      "days": [
        {
          "date": "2024-10-06",
          "count": 1,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-10-07",
          "count": 17,
          "level": 4,
          "y": 38
        },
        {
          "date": "2024-10-08",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-10-09",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-10-10",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-10-11",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-10-12",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 697,
      "days": [
        {
          "date": "2024-10-13",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-10-14",
          "count": 8,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-10-15",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-10-16",
          "count": 8,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-10-17",
          "count": 7,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-10-18",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-10-19",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 714,
      "days": [
        {
          "date": "2024-10-20",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-10-21",
          "count": 6,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-10-22",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-10-23",
          "count": 9,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-10-24",
          "count": 1,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-10-25",
          "count": 13,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-10-26",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 731,
      "days": [
        {
          "date": "2024-10-27",
          "count": 11,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-10-28",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-10-29",
          "count": 19,
          "level": 4,
          "y": 55
        },
        {
          "date": "2024-10-30",
          "count": 7,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-10-31",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-11-01",
          "count": 9,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-11-02",
          "count": 1,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 748,
      "days": [
        {
          "date": "2024-11-03",
          "count": 13,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-11-04",
          "count": 2,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-11-05",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-11-06",
          "count": 6,
          "level": 2,
          "y": 72
        },
        {
          "date": "2024-11-07",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2024-11-08",
          "count": 6,
          "level": 2,
          "y": 106
        },
        {
          "date": "2024-11-09",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    },
    {
      "x": 765,
      "days": [
        {
          "date": "2024-11-10",
          "count": 4,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-11-11",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-11-12",
          "count": 11,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-11-13",
          "count": 3,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-11-14",
          "count": 11,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-11-15",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-11-16",
          "count": 13,
          "level": 4,
          "y": 123
        }
      ]
    },
    {
      "x": 782,
      "days": [
        {
          "date": "2024-11-17",
          "count": 5,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-11-18",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-11-19",
          "count": 5,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-11-20",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-11-21",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-11-22",
          "count": 2,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-11-23",
          "count": 10,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 799,
      "days": [
        {
          "date": "2024-11-24",
          "count": 3,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-11-25",
          "count": 10,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-11-26",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-11-27",
          "count": 14,
          "level": 4,
          "y": 72
        },
        {
          "date": "2024-11-28",
          "count": 4,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-11-29",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-11-30",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 816,
      "days": [
        {
          "date": "2024-12-01",
          "count": 4,
          "level": 2,
          "y": 21
        },
        {
          "date": "2024-12-02",
          "count": 0,
          "level": 0,
          "y": 38
        },
        {
          "date": "2024-12-03",
          "count": 8,
          "level": 3,
          "y": 55
        },
        {
          "date": "2024-12-04",
          "count": 1,
          "level": 1,
          "y": 72
        },
        {
          "date": "2024-12-05",
          "count": 8,
          "level": 3,
          "y": 89
        },
        {
          "date": "2024-12-06",
          "count": 1,
          "level": 1,
          "y": 106
        },
        {
          "date": "2024-12-07",
          "count": 12,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 833,
      "days": [
        {
          "date": "2024-12-08",
          "count": 2,
          "level": 1,
          "y": 21
        },
        {
          "date": "2024-12-09",
          "count": 24,
          "level": 4,
          "y": 38
        },
        {
          "date": "2024-12-10",
          "count": 6,
          "level": 2,
          "y": 55
        },
        {
          "date": "2024-12-11",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2024-12-12",
          "count": 6,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-12-13",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-12-14",
          "count": 7,
          "level": 3,
          "y": 123
        }
      ]
    },
    {
      "x": 850,
      "days": [
        {
          "date": "2024-12-15",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-12-16",
          "count": 7,
          "level": 3,
          "y": 38
        },
        {
          "date": "2024-12-17",
          "count": 3,
          "level": 1,
          "y": 55
        },
        {
          "date": "2024-12-18",
          "count": 11,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-12-19",
          "count": 4,
          "level": 2,
          "y": 89
        },
        {
          "date": "2024-12-20",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2024-12-21",
          "count": 5,
          "level": 2,
          "y": 123
        }
      ]
    },
    {
      "x": 867,
      "days": [
        {
          "date": "2024-12-22",
          "count": 0,
          "level": 0,
          "y": 21
        },
        {
          "date": "2024-12-23",
          "count": 5,
          "level": 2,
          "y": 38
        },
        {
          "date": "2024-12-24",
          "count": 0,
          "level": 0,
          "y": 55
        },
        {
          "date": "2024-12-25",
          "count": 12,
          "level": 3,
          "y": 72
        },
        {
          "date": "2024-12-26",
          "count": 2,
          "level": 1,
          "y": 89
        },
        {
          "date": "2024-12-27",
          "count": 10,
          "level": 3,
          "y": 106
        },
        {
          "date": "2024-12-28",
          "count": 2,
          "level": 1,
          "y": 123
        }
      ]
    },
    {
      "x": 884,
      "days": [
        {
          "date": "2024-12-29",
          "count": 10,
          "level": 3,
          "y": 21
        },
        {
          "date": "2024-12-30",
          "count": 3,
          "level": 1,
          "y": 38
        },
        {
          "date": "2024-12-31",
          "count": 26,
          "level": 4,
          "y": 55
        },
        {
          "date": "2025-01-01",
          "count": 0,
          "level": 0,
          "y": 72
        },
        {
          "date": "2025-01-02",
          "count": 0,
          "level": 0,
          "y": 89
        },
        {
          "date": "2025-01-03",
          "count": 0,
          "level": 0,
          "y": 106
        },
        {
          "date": "2025-01-04",
          "count": 0,
          "level": 0,
          "y": 123
        }
      ]
    }
  ],
  "description": "contributions in 2024"
},
};

export const COMMIT_PULSE_ITEMS: CommitPulseItem[] = [
  {
    "id": "commit-1",
    "repo": "NexLearn-AI",
    "branch": "main",
    "hash": "e8f492a",
    "message": "fix(engine): optimize websocket frame serialization & buffer pooling",
    "time": "2 hours ago",
    "url": "https://github.com/aniket-meshram/NexLearn-AI"
  },
  {
    "id": "commit-2",
    "repo": "POS-SYSTEM",
    "branch": "master",
    "hash": "7b10fa4",
    "message": "feat(sync): offline-first indexedDB sync with conflict-free replicated data",
    "time": "4 hours ago",
    "url": "https://github.com/aniket-meshram/POS-SYSTEM"
  },
  {
    "id": "commit-3",
    "repo": "CoinNova",
    "branch": "main",
    "hash": "3d91cf0",
    "message": "perf(render): GPU instanced orderbook depth chart with dynamic LOD",
    "time": "7 hours ago",
    "url": "https://github.com/aniket-meshram/CoinNova"
  },
  {
    "id": "commit-4",
    "repo": "Visionary-AI",
    "branch": "main",
    "hash": "a4c5821",
    "message": "feat(vision): WebGPU hardware-accelerated token streaming & inference",
    "time": "12 hours ago",
    "url": "https://github.com/aniket-meshram/Visionary-AI"
  },
  {
    "id": "commit-5",
    "repo": "PORTFOLIO",
    "branch": "main",
    "hash": "9d21e05",
    "message": "feat(heatmap): interactive cell inspector with neon wave ignite animation",
    "time": "1 day ago",
    "url": "https://github.com/aniket-meshram"
  }
];

export const TERMINAL_GIT_LOG: TerminalGitLogItem[] = [
  {
    "hash": "e8f492a",
    "decorations": "HEAD -> main, origin/main",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "2 hours ago",
    "graphPrefix": "* ",
    "message": "fix(engine): optimize websocket frame serialization & buffer pooling",
    "repo": "NexLearn-AI"
  },
  {
    "hash": "7b10fa4",
    "decorations": "origin/master",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "4 hours ago",
    "graphPrefix": "* |",
    "message": "feat(sync): offline-first indexedDB sync with conflict-free replicated data",
    "repo": "POS-SYSTEM"
  },
  {
    "hash": "3d91cf0",
    "decorations": "feature/orderbook-v2",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "7 hours ago",
    "graphPrefix": "* |",
    "message": "perf(render): GPU instanced orderbook depth chart with dynamic LOD",
    "repo": "CoinNova"
  },
  {
    "hash": "a4c5821",
    "decorations": "",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "12 hours ago",
    "graphPrefix": "| *",
    "message": "feat(vision): WebGPU hardware-accelerated token streaming & inference",
    "repo": "Visionary-AI"
  },
  {
    "hash": "9d21e05",
    "decorations": "tag: v2.4.0",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "1 day ago",
    "graphPrefix": "|/ ",
    "message": "feat(heatmap): interactive cell inspector with neon wave ignite animation",
    "repo": "PORTFOLIO"
  },
  {
    "hash": "4f88b12",
    "decorations": "",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "2 days ago",
    "graphPrefix": "* ",
    "message": "feat(cert): 3D holographic tilt certificate previewer with frosted specular glint",
    "repo": "PORTFOLIO"
  },
  {
    "hash": "1c09da3",
    "decorations": "",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "3 days ago",
    "graphPrefix": "* ",
    "message": "refactor(auth): WebAuthn passkey challenge verification and jwt rotation",
    "repo": "NexLearn-AI"
  },
  {
    "hash": "8a552e1",
    "decorations": "",
    "author": "Aniket Meshram <aniketmeshram@dev>",
    "date": "4 days ago",
    "graphPrefix": "* ",
    "message": "perf(threejs): implement instanced draw calls & LOD dynamic geometry",
    "repo": "PORTFOLIO"
  }
];
