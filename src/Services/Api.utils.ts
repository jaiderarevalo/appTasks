export type DataItemPost = {
    name: string;
    data: File | { uri: string; name: string } | string | File[] | Blob;
    isFile?: boolean;
  };
  

  export const convertToFormData = (data?: { [key: string]: string | number | File }) => {
    const body: DataItemPost[] = [];
    if (!data) return [];
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            for (const [index, item] of value.entries()) {
                if (item instanceof File || item instanceof Blob) {
                    body.push({
                        name: `${key}[${index}]`,
                        data: item,
                        isFile: true
                    });
                }
            }
            continue;
        }

        if (typeof value === 'object' && value !== null && 'uri' in value && 'name' in value) {
            body.push({
                name: key,
                data: value,
                isFile: true
            });
            continue;
        }

        body.push({
            name: key,
            data: String(value)
        });
    }

    return body;
}

export const convertToDataItems = (mydata: any): DataItemPost[] => {
  const items: DataItemPost[] = [];

  for (const key in mydata) {
      const value = mydata[key];

      // Manejo de arrays
      if (Array.isArray(value)) {
          const isFileList = value.every((item) => item instanceof File || item instanceof Blob);

          if (isFileList) {
              items.push({
                  name: key,
                  data: value,
                  isFile: true
              });
              continue;
          } else {
              value.forEach((item, index) => {
                  if (item instanceof File || item instanceof Blob) {
                      items.push({
                          name: `${key}[${index}]`,
                          data: item,
                          isFile: true
                      });
                  } else {
                      items.push({
                          name: `${key}[${index}]`,
                          data: item
                      });
                  }
              });
          }
          continue;
      }

      // Manejo de blobs y archivos
      if (value instanceof Blob || value instanceof File) {
          items.push({
              name: key,
              data: value,
              isFile: true
          });
          continue;
      }

      // Manejo de todos los demás valores
      items.push({
          name: key,
          data: value
      });
  }

  return items;
}
export const makeDataFormData = (data: DataItemPost[]) => {
  const formData = new FormData();
  if (data) {
      for (const d of data) {

          if (d.data instanceof File) {
              formData.append(d.name, d.data, d.data.name);
              continue;
          }

          if (d.isFile && d.data instanceof Blob) {
              formData.append(d.name, d.data);
              continue;
          }

          if (typeof d.data === "string" || typeof d.data === "number" || typeof d.data === "boolean") {
              formData.append(d.name, d.data.toString());
              continue;
          }

          if (d.data === null) {
              formData.append(d.name, d.data as any);
              continue;
          }

          if (d.data instanceof Array) {
              const isFileList = d.data.every((item: any) => item instanceof File || item instanceof Blob);

              if (isFileList) {
                  for (let i = 0; i < d.data.length; i++) {
                      formData.append(d.name, d.data[i]);
                  }
              }
              continue;
          }

          console.warn(`No se pudo añadir el campo ${d.name} al FormData porque tiene un tipo desconocido o no válido.`);
      }
  }
  return formData;
}