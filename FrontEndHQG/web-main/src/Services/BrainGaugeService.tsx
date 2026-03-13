export async function getBrainGaugeData(subjectId: string) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BRAIN_GAUGE_URL
    }/brain-gauge/subject-data/${subjectId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.log("This did not work: ", response);
  }
  const json = await response.json();
  return json;
}

export async function loginToBrainGauge(email: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BRAIN_GAUGE_URL}/brain-gauge/login`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok) {
    console.log("This did not work: ", response);
  }

  const json = await response.json();
  return json;
}

export async function checkAuth(): Promise<boolean> {
  const response = await fetch(
    `${import.meta.env.VITE_BRAIN_GAUGE_URL}/brain-gauge/check-auth`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const body = await response.json();

  if (body.message === "Authorized") {
    return true;
  }
  console.log("Check auth response: ", await response.json());
  if (!response.ok) {
    return false;
  }
  return true;
}

export async function logoutFromBrainGauge() {
  const response = await fetch(
    `${import.meta.env.VITE_BRAIN_GAUGE_URL}/brain-gauge/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.log("This did not work: ", response);
  }
  return response;
}

export async function getBrainGaugeSubjects() {
  const response = await fetch(
    `${import.meta.env.VITE_BRAIN_GAUGE_URL}/brain-gauge/subjects`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.log("This did not work: ", response);
  }
  const json = await response.json();
  return json;
}
