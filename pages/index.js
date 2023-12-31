import HomePage from "components/template/HomePage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {

  return (
    <HomePage/>
  )
}


export async function getServerSideProps(context){
  const session = await getServerSession(context.req , context.res , authOptions);
  if(!session){
    return {
      redirect : {
        destination : "/signin" ,
        permanent : false
      }
    }
  }
  return { props : {}}
}