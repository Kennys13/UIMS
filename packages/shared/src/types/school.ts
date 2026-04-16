export type SchoolContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ApiHealthResponse = {
  status: "ok";
  service: string;
  timestamp: string;
};

