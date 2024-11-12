import { motion } from 'framer-motion';

function Step({ step, onSelectOption, selectedOption }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, x: -100 }}   
      animate={{ opacity: 1, x: 0 }}  
      transition={{ duration: 1, ease: "easeInOut" }} 
    >
      <h2 className="text-xl font-semibold mb-4">{step?.title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {step?.options?.map((option, index) => (
          <motion.button
            key={index + "option"}
            onClick={() => onSelectOption(index)}
            className={`p-4 border rounded-lg transition-transform duration-300 ${
              selectedOption === option ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
            } group`}
            whileHover={{ scale: 1.05 }}  
            transition={{ duration: 0.2 }}   
          >
            <span className="text-3xl">{option?.icon}</span>
            <div className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {option?.label}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default Step;
