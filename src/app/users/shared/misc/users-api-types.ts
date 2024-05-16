interface SupportData {
  url: string;
  text: string;
}

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

/** 
 * Response shape for `/users/:id`
 */
export interface GetUserSingle {
  data: UserData;
  support: SupportData
}

/**
 * Response shape for `/users/`
 */
export interface GetUserList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserData[];
  support: SupportData;
}
