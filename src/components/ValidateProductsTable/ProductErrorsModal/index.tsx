export default function ProductErrorsModal({
    modalRef,
    selectedProduct,
}: {
    modalRef: any;
    selectedProduct: { [key: string]: any } | null;
}) {
    return (
        <dialog className="modal" ref={modalRef}>
            <div className="modal-box bg-white text-black">
                <div className="modal-action">
                    <form method="dialog">
                        <button className="flex w-8 h-8 items-center justify-center border border-red-500 text-red-500 text-bold rounded-md">
                            X
                        </button>
                    </form>
                </div>

                <div className="flex flex-wrap py-8 space-y-4">
                    <p className="text-lg w-full text-center">{selectedProduct?.name}</p>
                    {selectedProduct?.errors.map((error: string) => (
                        <p className="text-red-500 text-bold block my-2 w-full text-center">{error}</p>
                    ))}
                </div>
            </div>
        </dialog>
    );
}
