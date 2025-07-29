import styles from "./form.module.css";

const Fields = {
  title: {
    id: "title",
    label: "Title",
    type: "text",
    name: "title",
    validationRules: {},
  },
  image: {
    id: "image",
    label: "Image URL",
    type: "file",
    name: "image",
    validationRules: {},
  },
  content: {
    id: "content",
    label: "Content",
    type: "text",
    name: "content",
    validationRules: {},
  },
};

export default function FormNewBlog() {
  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor={Fields.title.name}>{Fields.title.label}</label>
        <input
          type={Fields.title.type}
          id={Fields.title.id}
          name={Fields.title.name}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor={Fields.image.name}>{Fields.image.label}</label>
        <input
          type={Fields.image.type}
          accept="image/png, image/jpeg"
          id={Fields.image.id}
          name={Fields.image.name}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor={Fields.content.name}>{Fields.content.label}</label>
        <textarea id={Fields.content.id} name={Fields.content.name} />
      </div>

      <div className={styles.cta}>
        <button type="reset">Reset</button>
        <button>Create Post</button>
      </div>
    </form>
  );
}
