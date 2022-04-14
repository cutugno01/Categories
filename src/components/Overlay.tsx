const Overlay = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`modal-overlay ${isModalOpen ? "active" : ""}`}
      onClick={() => {
        setIsModalOpen(false);
      }}
    ></div>
  );
};

export default Overlay;
