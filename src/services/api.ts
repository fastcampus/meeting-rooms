const BASE_URL = "/api";
const MEMBER_GROUP_ID = 9805;

export const ROOM_IDS: Record<string, number> = {
  "373160": 19484,
  ada: 7721,
  alan: 7715,
  charlie: 7725,
  jan: 7716,
  leedo: 7723,
  marcel: 7720,
  marie: 7722,
  miles: 7719,
  newyork: 19008,
  nicola: 7717,
  steve: 7727,
  fireside: 7724,
};

export const ROOMS = [
  { id: "373160", name: "373160", spaceId: 19484, floor: 7, capacity: 8 },
  { id: "ada", name: "Ada", spaceId: 7721, floor: 7, capacity: 8 },
  { id: "alan", name: "Alan", spaceId: 7715, floor: 6, capacity: 8 },
  { id: "charlie", name: "Charlie", spaceId: 7725, floor: 7, capacity: 8 },
  { id: "jan", name: "Jan", spaceId: 7716, floor: 6, capacity: 8 },
  { id: "leedo", name: "Lee Do", spaceId: 7723, floor: 7, capacity: 15 },
  { id: "marcel", name: "Marcel", spaceId: 7720, floor: 6, capacity: 8 },
  { id: "marie", name: "Marie", spaceId: 7722, floor: 7, capacity: 8 },
  { id: "miles", name: "Miles", spaceId: 7719, floor: 6, capacity: 8 },
  { id: "newyork", name: "NewYork", spaceId: 19008, floor: 7, capacity: 8 },
  { id: "nicola", name: "Nicola", spaceId: 7717, floor: 6, capacity: 15 },
  { id: "steve", name: "Steve", spaceId: 7727, floor: 7, capacity: 8 },
  { id: "fireside", name: "The Fireside", spaceId: 7724, floor: 7, capacity: 25 },
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
