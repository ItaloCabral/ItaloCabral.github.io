import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "../constants/web3forms";
import type { InquiryType } from "../types/locale";

export interface InquiryPayload {
  subject: string;
  name: string;
  email: string;
  message: string;
  inquiryType: InquiryType;
  organization?: string;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const body: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: payload.subject,
    name: payload.name,
    email: payload.email,
    message: payload.message,
    inquiry_type: payload.inquiryType,
    from_name: "Portfólio Italo Cabral",
    botcheck: "",
  };

  if (payload.organization) {
    body.organization = payload.organization;
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as Web3FormsResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.message ?? "Request failed");
  }
}
