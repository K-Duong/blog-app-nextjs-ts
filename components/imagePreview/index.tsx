import Image from "next/image";

import styles from "./styles.module.css";

export default function ImagePreview({imageUrl} : {imageUrl: string}) {
  return (
    <div className={styles.previewContainer} >
      <Image alt="preview" className={styles.preview} src={imageUrl} width={100} height={100} loading="lazy" />
    </div>
  )

}