export interface Prompt {
    id: string;
    userId: string;
    category_id: {name:string};
    sub_category_id: {name:string};
    prompt: string;
    response: string;
    createdAt: string;
  }
  