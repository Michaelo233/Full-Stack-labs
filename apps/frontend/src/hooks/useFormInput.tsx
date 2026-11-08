import { useState } from "react";

type InputValidator = (value: string) => string[];

export function useFormInput(
  initialValue: string = "",
) {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function validate(validator: InputValidator): string[] {
    const validationMessages = validator(value);
    setMessages(validationMessages);

    return validationMessages;
  }

  function reset(): void {
    setValue("");
    setMessages([]);
  }

  return {
    value,
    setValue,
    messages,
    setMessages,
    validate,
    reset,
  };
}
