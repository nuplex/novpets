/**
 * Wrapper around localStorage.setItem that accounts for non-existence of a key.
 * This will also return the updated data.
 * @param key
 * @param value
 */
export function updateLocalStorage(key: string, value: any) {
  const data = localStorage.getItem(key);
  let dataRaw: string;

  if (!data) {
    // Set it first before retrieving.
    localStorage.setItem(key, JSON.stringify(value));
    dataRaw = localStorage.getItem(key)!;
  } else {
    dataRaw = data;
  }

  const dataParsed = JSON.parse(dataRaw);
  const updatedData = {...dataParsed, ...value};
  localStorage.setItem(key, JSON.stringify(updatedData));
}
