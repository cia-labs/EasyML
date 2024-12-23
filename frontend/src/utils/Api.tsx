export const api = 'https://which-api.cialabs.org';

/**
      Fetches Category
**/
export const fetchCategory = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${api}/metadata?query=category`);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Error fetching models: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
      Fetches Model
**/
export const fetchModels = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${api}/metadata?query=model`);
    if (!response.ok) {
      throw new Error('Failed to fetch odels');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Error fetching models: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
