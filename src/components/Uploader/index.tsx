import { ChangeEvent } from 'react';

export default function Uploader({
    accept,
    onChange,
    file,
}: {
    accept: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    file?: File | null;
}) {
    return (
        <div className="w-full h-40 flex flex-col relative border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
            <div className="w-full h-full flex flex-wrap flex-col items-center justify-center m-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600 md:w-12 md:h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>

                <p className="pt-1 text-center text-xs tracking-wider h-max text-gray-400 group-hover:text-gray-600 md:text-sm">
                    {file ? `${file.name}` : `CARREGAR ARQUIVO`}
                </p>
            </div>
            <input
                onChange={onChange}
                type="file"
                accept={accept}
                className="h-full w-full opacity-0 cursor-pointer absolute"
            />
        </div>
    );
}
