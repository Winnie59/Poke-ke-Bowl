import React from 'react'

const PickPoke = () => {
  return (
    <div>PickPoke</div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/pokes/${params.id}`)
      return {
        props: {
          poke: res.data
        }
    }
}

export default PickPoke