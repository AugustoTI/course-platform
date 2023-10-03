import Image from 'next/image'
import logo from '@/assets/logo.svg'

export function Logo() {
  return <Image src={logo} alt="logo" className="h-auto w-[130px]" />
}
