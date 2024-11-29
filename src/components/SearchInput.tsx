import Image from "next/image";
import {FC} from "react";

interface Props {
    value: string;
    onChange(value: string): void;
}

const SearchInput: FC<Props> = ({value, onChange}) => {
    return (
        <div className="flex content-between relative">
            <input
                type="text"
                className="py-3 pl-4 pr-30 block w-full border border-gray-300 rounded-lg text-sm focus:ring-1 focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
                placeholder="Поиск по названию"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {value && (
                <div
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => onChange("")}
                >
                    <Image
                        aria-hidden
                        src="/cross.svg"
                        width={32}
                        height={32}
                        alt="Очистить"
                    />
                </div>
            )}
        </div>
    );
};

export default SearchInput;
