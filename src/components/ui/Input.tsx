import {memo, ReactNode} from "react";
import {motion} from 'framer-motion'

const Input = (
    {
        id,
        name,
        type,
        required,
        label,
    }:
        {
            id: string,
            name: string,
            type: string,
            required: boolean,
            label: string | ReactNode,
        }
) => {

    return (
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          transition={{
            delay: 0.3
          }}
        >
            <label htmlFor={id} className="text-left block text-sm font-medium">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            />
        </motion.div>
    )
}

export default memo(Input)