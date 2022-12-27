import React, {useEffect} from "react";
import MenuChild from "./MenuChild";

export default function RecursiveMenu({ categories }) {

    const recurseCategories = (category) => {
        return (
            <MenuChild id={category.id} key={category.id} catId={category.id} name={category.cat_name}>
                {category.children ? category.children.map((child) => {
                    return (
                        <React.Fragment key={child.id}>{recurseCategories(child)}</React.Fragment>
                    )
                }) : null}
            </MenuChild>
        )
    }

    return (
        <>
            {categories && Object.values(categories).map((roots) => {
                return (
                    <div key={roots.id} className="recursive-menu">
                        {recurseCategories(roots)}
                    </div>
                )
            })}
        </>
    )
}