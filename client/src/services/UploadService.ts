export interface RecordProps {
  address: string;
  logo: string;
  name: string;
}

export const uploadRecord = async (data: RecordProps) => {
  await fetch("http://localhost:8080/submit", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
