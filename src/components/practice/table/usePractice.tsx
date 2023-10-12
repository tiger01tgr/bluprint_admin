import { PracticeQuestion } from '@/functions/dataFetching/practiceSets/PracticeSets';
import { createPracticeSetCall } from '@/functions/dataFetching/practiceSets/PracticeSets';



const usePractice = () => {

//   useEffect(() => {
//     const fetchData = async () => {
//       const [data, industry] = await Promise.all([getEmployers(), getIndustries()])
//       setData(data);
//       setIndustry(industry);
//       console.log(data)
//       console.log(industry)
//     };
//     fetchData();
//   }, [])

  const createPracticeSet = async (name: string, employerId: number, roleId: number, interviewType: string, questionList: PracticeQuestion[]) => {
    const res = createPracticeSetCall(name, employerId, roleId, interviewType, questionList);
  }

  return (
    {
      createPracticeSet
    }
  )
}

export default usePractice