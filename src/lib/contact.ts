export interface ContactFormData {
  name: string;
  email: string;
  topic?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  missingKey?: boolean;
}

const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ||
  'ad561256-f9c1-4c2d-a32b-d91212b4187a';

export const isWeb3FormsConfigured = Boolean(
  WEB3FORMS_KEY &&
  WEB3FORMS_KEY.length > 10 &&
  !WEB3FORMS_KEY.includes('YOUR_ACCESS_KEY')
);

/**
 * Send contact form message directly to aniketmeshram445@gmail.com using Web3Forms
 */
export async function sendContactMessage(data: ContactFormData): Promise<ContactResponse> {
  if (!isWeb3FormsConfigured) {
    console.warn(
      '[Contact] VITE_WEB3FORMS_ACCESS_KEY is not set in .env. Get a free key at https://web3forms.com.'
    );
    // Return friendly simulated success if developing locally without key, but flag missingKey
    return {
      success: true,
      missingKey: true,
      message: 'Notice: Key not set in .env yet. Message was simulated locally.',
    };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: data.name.trim(),
        email: data.email.trim(),
        subject: `New Portfolio Message from ${data.name.trim()} [${data.topic || 'General'}]`,
        from_name: `${data.name.trim()} via Portfolio`,
        topic: data.topic || 'General Inquiry',
        message: data.message.trim(),
        botcheck: '', // honeypot for spam protection
      }),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Message delivered directly to Aniket!',
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to deliver message. Please try again.',
      };
    }
  } catch (error) {
    console.error('[Contact] Error submitting form to Web3Forms:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection or reach out via LinkedIn/Email.',
    };
  }
}
