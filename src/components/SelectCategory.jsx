import { useEffect, useMemo, useState } from 'react';

import { Dropdown } from '@nextui-org/react';

const URL = import.meta.env.VITE_URL_API;

export const SelectCategory = ({ name, handleSubmitCategory, handleAddCategory, isFilter = true }) => {

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(new Set([]));

    useEffect(() => {
        const getCategories = async () => {
            await fetch(`${URL}category/`)
                .then(response => response.json())
                .then(result => {
                    const { success, data } = result;
                    if (success) setCategories(data);
                });
        }
        getCategories();
    }, [setCategories]);

    const selectedValue = useMemo(
        () => Array.from(selected).join(',').replaceAll('_', ' '),
        [selected]
    );

    return (
        <Dropdown>
            <Dropdown.Button flat color="secondary">
                {name}
            </Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions" onAction={(key) => (
                isFilter
                    ? handleSubmitCategory(parseInt(key))
                    : handleAddCategory(parseInt(key))
            )}
                selectionMode={isFilter ? 'single' : 'multiple'}
                selectedKeys={selected}
                onSelectionChange={setSelected}
            >
                {
                    categories.map(category => (
                        <Dropdown.Item key={category.idCategory}>{category.name}</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
