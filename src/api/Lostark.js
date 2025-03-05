const { ARMORIES, key } = process.env;

const api = async (id) => {
  const url = `${ARMORIES}${id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + key,
    },
  });

  if (res.ok) {
    return await res.json();
  } else {
    return null;
  }
};

export const CharacterSearch = async (query) => {
  try {
    return await api(query);
  } catch (e) {
    console.log(e);
    return null;
  }
};
