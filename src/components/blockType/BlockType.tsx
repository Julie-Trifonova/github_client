import React, {useState} from "react";

import {nanoid} from "nanoid";

import styles from "./BlockType.module.scss";

type BlockType = {
    disabled: boolean;
    handleSortByNameType: any;
    handleSortByUpdatingDateType: any;
    handleSortByStarsType: any;
    handleSortByCreatingDateType: any;
};

const BlockType: React.FC<BlockType> = (props) => {
    const [visible, setVisible] = useState(false);
    const [typeValue, setTypeValue] = useState("Type");

    const handleChangeVisibility = () => {
        setVisible(!visible);
    };
    const handleChangeType = (e: any, value: string) => {
        if (value === 'sort by stars') {
            props.handleSortByStarsType();
        } else if (value === 'sort by name') {
            props.handleSortByNameType();
        } else if (value === 'sort by date') {
            props.handleSortByUpdatingDateType();
        } else if (value === 'default') {
            props.handleSortByCreatingDateType();
        }
        setTypeValue(value);
        e.target.checked = !e.target.checked;
    };

    const arrOptions = [
        {key: nanoid(), value: "default", checked: false},
        {key: nanoid(), value: "sort by stars", checked: false},
        {key: nanoid(), value: "sort by name", checked: false},
        {key: nanoid(), value: "sort by date", checked: false},
    ];

    const currentType = () => {
        const obj: any[] = [];
        arrOptions.map((option) => {
            if (typeValue === option.value) {
                obj.push({key: nanoid(), value: option.value, checked: true});
            } else {
                obj.push({key: nanoid(), value: option.value, checked: false});
            }
        });
        return obj;
    };
    const arr = currentType();

    return (
        <div className={styles.block_type_select}>
            <div className={styles.type_select_title}>Repositories</div>
            <div className={styles.type_select_title_list_block}>
                <button
                    className={styles.type_select_chosen_element}
                    onClick={handleChangeVisibility}
                >
                    {typeValue}
                    <svg
                        className={styles.type_select_chosen_element_svg}
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.7731 0.947033L6.24888 6.61136C5.8197 7.12955 5.15805 7.12955 4.74676 6.61136L0.222496 0.947033C-0.206683 0.410976 0.00790646 0 0.669557 0H10.3261C11.0056 0 11.2023 0.410976 10.7731 0.947033Z"
                            fill="#6C757D"
                        />
                    </svg>
                </button>
                {visible && (
                    <div className={styles.type_select_list}>
                        {arr.map((option) => (
                            <div key={option.key}
                                 className={styles.type_select_list_element}
                            >
                                <label>
                                    <input
                                        checked={option.checked}
                                        className={styles.type_select_list_element_input}
                                        name={option.value}
                                        type="checkbox"
                                        onClick={handleChangeVisibility}
                                        onChange={(e) => handleChangeType(e, option.value)}
                                    />
                                    <div className={styles.type_select_list_element_input_text}>
                                        {option.value}
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export {BlockType};
