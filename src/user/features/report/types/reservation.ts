export type ReservationType = {
  [key: string]: string | boolean;
};

export type ResReservationType = {
  content: ReservationType;
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
