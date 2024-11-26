import {memo, ReactNode} from "react";
import {motion} from 'framer-motion'

const Button = ({
                  type = 'button',
                  disabled,
                  children,
                }: {
  type: string;
  disabled?: boolean;
  children: ReactNode
}) => {

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
      <button
        disabled={disabled}
        type={type}
        className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {children}
      </button>
    </motion.div>

  )
}

export default memo(Button)