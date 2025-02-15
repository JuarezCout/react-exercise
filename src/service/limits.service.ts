export const getLimits = async () => {
  try {
    const response = await fetch('http://localhost:3001/limits');

    if (!response.ok) {
      throw new Error('Bad request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error finding limits:', error);
  }

  return null;
};
