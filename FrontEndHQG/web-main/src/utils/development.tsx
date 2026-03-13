export const developmentFeature = (auth: any) => {
  if (auth?.user?.email) {
    return [
      'drmkessler@sbcglobal.net',
      'gabriel@cilocybin.com',
      // "test@mail.com",
      'ruan@cilocybin.com',
      'ruandn@gmail.com',
      'drjava_k@hotmail.com',
    ].includes(auth?.user?.email);
  } else {
    return false;
  }
};
