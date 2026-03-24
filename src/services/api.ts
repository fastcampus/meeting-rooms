const BASE_URL = "https://api.fastfive.co.kr";
const MEMBER_GROUP_ID = 9805;

export const ROOM_IDS: Record<string, number> = {
  alan: 7715,
  miles: 7719,
  nicola: 7717,
  fireside: 7724,
};

export const ROOMS = [
  { id: "alan", name: "Alan", spaceId: 7715 },
  { id: "miles", name: "Miles", spaceId: 7719 },
  { id: "nicola", name: "Nicola", spaceId: 7717 },
  { id: "fireside", name: "Fireside", spaceId: 7724 },
];

interface LoginResponse {
  success: boolean;
  message?: string;
}

interface ReservationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class FastFiveAPI {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "mode-type": "group",
        origin: "https://members.fastfive.co.kr",
        referer: "https://members.fastfive.co.kr/",
        "x-application": "web",
      },
      credentials: "include",
      body: JSON.stringify({
        application: "web",
        email,
        password,
      }),
    });

    return response.json();
  }

  async reserve(
    spaceId: number,
    startTime: string,
    endTime: string
  ): Promise<ReservationResponse> {
    const response = await fetch(`${BASE_URL}/mobile/spaceReservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "mode-type": "group",
        origin: "https://members.fastfive.co.kr",
        referer: "https://members.fastfive.co.kr/",
        "x-application": "web",
      },
      credentials: "include",
      body: JSON.stringify({
        spaceId,
        memberGroupId: MEMBER_GROUP_ID,
        startTime,
        endTime,
        name: "",
        attendeeIds: [],
        usedCredits: null,
        linkUrl: "",
        linkName: "",
        memo: "",
        visitors: [],
      }),
    });

    return response.json();
  }
}

export const api = new FastFiveAPI();
