const validateForm = (formData, name, job) => {
  const errors = {
    name: "",
    job: "",
  };
  if (
    (formData.touched.name && name.length < 3) ||
    (formData.touched.name && name.length > 12)
  ) {
    errors.name = "Name must be between 2 and 12";
  }
  if (
    (formData.touched.job && job.length < 3) ||
    (formData.touched.job && job.length > 12)
  ) {
    errors.job = "Job must be between 2 and 12";
  }
  return errors;
};

export { validateForm };
