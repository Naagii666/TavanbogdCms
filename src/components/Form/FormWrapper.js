import { Form } from "antd";

const FormWrapper = ({ el, children, formCode, isMulti, style, valuePropName="value", form=null }) => {

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const rules = (type) => {
    let label = el.label;
    let rules = [
      {
        required: el.isRequired,
        message: `${label} нь заавал бөглөх талбар байна.`,
      }
    ];

    switch (type) {
      case 'text':
      case 'password':
        rules.push(
          {
            min: el.minLength,
            message: `${label}-н урт хамгийн багадаа ${el.minLength} урттай байна.`,
          },
          {
            max: el.maxLength,
            message: `${label}-н урт хамгийн ихдээ ${el.maxLength} урттай байна.`,
          },
          {
            pattern: el.regex,
            message: `${el.regexName} оруулна уу.`,
          }
        );
    }

    return rules;
  }

  return (
    <>
      { isMulti
        ? <Form.Item
          wrapperCol={{ sm: 22 }}
          style={style}
          key={el.id}
          name={formCode !== undefined ? [formCode, el.name] : el.name}
          rules={rules(el.type)}
          tooltip={el.isUnique ? "Давхардахгүй утга байх ёстой" : (el.max && el.min ? `Хамгийн их утга: ${el.max} Хамгийн бага утга: ${el.min}` : null)}
        >
          {children}
        </Form.Item>
        : <Form.Item
          style={style}
          key={el.id}
          name={formCode !== undefined ? [formCode, el.name] : el.name}
          label={el.label}
          rules={rules(el.type)}
          tooltip={el.isUnique ? "Давхардахгүй утга байх ёстой" : (el.max && el.min ? `Хамгийн их утга: ${el.max} Хамгийн бага утга: ${el.min}` : null)}
          valuePropName={valuePropName}
          onChange={(e) => {
            if(el.type === 'base64') {
              console.log('base64');
              setTimeout(() => {
                convertImageToBase64(form.getFieldValue(el.name).file).then(res => {
                  form.setFieldsValue({[el.name]: res.split(";base64,")[1]});
                });
              }, 100)
            } 
          }}
        >
          {children}
        </Form.Item>
      }
    </>
  )
};

export default FormWrapper;