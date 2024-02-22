import { motion } from 'framer-motion';

const FormResult = () => {
  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        x: {
          ease: 'easeIn',
          duration: 0.2,
        },
        opacity: {
          ease: 'easeIn',
          duration: 1,
        },
      }}
    >
      <h3>Your responses has been saved ✅</h3>
    </motion.div>
  );
};

export default FormResult;
