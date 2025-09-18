"use client";

import { useState } from "react";
import { notFound, redirect } from "next/navigation";

import Modal from "@/components/modal";
import Button from "../ButtonWrapper";


function ActionsModal({
  setIsOpenedModal,
  handleDelete,
}: {
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  return (
    <>
      <Button type="button" onClick={handleDelete}>
        {" "}
        Delete{" "}
      </Button>
      <Button type="button" onClick={() => setIsOpenedModal(false)}>
        {" "}
        Cancel{" "}
      </Button>
    </>
  );
};


export default function ButtonDeleteBlog({ blogId }: { blogId: number }) {
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // open modal to confirm
    setIsOpenedModal(true);
  };

  const handleDelete = async () => {
    //  e.stopPropagation();
    // fetch to delete
    const result = await fetch(`/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
    if (result.ok) {
      console.log("deleted blog id:", blogId);
      // close modal
      setIsOpenedModal(false);
      // redirect to /blogs
      redirect("/blogs");
    } else {
      notFound();
    }
  };

  return (
    <>
      <Button type="button" onClick={handleOpenModal}>
        {" "}
        Delete{" "}
      </Button>

      <Modal
        isOpen={isOpenedModal}
        actions={
          <ActionsModal
            setIsOpenedModal={setIsOpenedModal}
            handleDelete={handleDelete}
          />
        }
      >
        Do you really want to delete this blog?
      </Modal>
    </>
  );
}
