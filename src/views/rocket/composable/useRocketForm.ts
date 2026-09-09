import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { rocketSchema, type RocketForm } from "../schemas/rocket";
import { countryCode } from "@/constants/country-code";
import { formatDateToApi } from "@/utils/format-date";
import { ref } from "vue";

export type RocketPayload = Omit<RocketForm, "maiden_flight"> & {
  maiden_flight: string;
};

export function useRocketForm(onSuccess: (payload: RocketPayload) => Promise<void>) {
  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: toTypedSchema(rocketSchema),
  });

  const isSubmitting = ref<boolean>(false);
  const [name, nameProps] = defineField("name");
  const [imageUrl, imageUrlProps] = defineField("image_url");
  const [launchCost, launchCostProps] = defineField("launch_cost");
  const [country, countryProps] = defineField("country_code");
  const [maidenFlight, maidenFlightProps] = defineField("maiden_flight");
  const [description, descriptionProps] = defineField("description");

  function handleDialogChange(value: boolean) {
    if (!value) {
      resetForm();
    };

    return value;
  };

  function createPayload(values: RocketForm): RocketPayload {
    return {
      ...values,
      maiden_flight: formatDateToApi(values.maiden_flight),
    };
  };

  const submitForm = handleSubmit(async (values) => {
    const payload = createPayload(values);

    isSubmitting.value = true;

    try {
      await onSuccess(payload);
      resetForm();
    } catch (err) {
      console.error("Failed to save rocket:", err);
    } finally {
      isSubmitting.value = false;
    };
  });

  return {
    countryCode,
    name,
    nameProps,
    imageUrl,
    imageUrlProps,
    launchCost,
    launchCostProps,
    country,
    countryProps,
    maidenFlight,
    maidenFlightProps,
    description,
    descriptionProps,
    errors,
    handleDialogChange,
    submitForm,
    resetForm,
    isSubmitting,
  };
};