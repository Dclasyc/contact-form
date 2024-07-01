'use client'
import React from "react"
import { FormEvent, useState } from "react"


export const ContactForm = () => {
    const  [isSubmitted, setSubmitted] =useState(false)
     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
     const [message, setMessage] = useState('')

     const onSubmit = async (e: FormEvent) => {
        e.preventDefault()

       try {

        const res = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                name, email, message
            }),
            headers: {
                'content-type': 'application/json'
            },
        })
        if (res.status === 200){
            setSubmitted(true)
        }

       } catch(err: any) {
        console.error('Err', err)
       }
       
     }


    return (
        isSubmitted 
        ?(
            <div className="bg-green-400">
                <h1 className="text-center font-semibold text-3xl">Thank you for your message!</h1>
            </div>
         )
        :(
          <div className=" container px-10 pt-8 pb-8  bg-sky-100">
            <p className="text-center text-2xl font-semibold ">Contact us</p>
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
                <label className="form-control w-full">
                <div className="label font-semibold">
                <span className="label-text">Fullname</span>
                </div>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text"
                    placeholder="Dipo Dclasyc" 
                    className="input input-bordered input-primary w-full text-sm" 
                />
                </label>

                <label className="form-control w-full">
                <div className="label font-semibold">
                <span className="label-text">Email</span>
                </div>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="text"
                    placeholder="your@email.com" 
                    className="input input-bordered input-primary w-full text-sm" 
                />
                </label>

                <label className="form-control w-full">
                <div className="label">
                <span className="label-text font-semibold">Leave a message</span>
                </div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="textarea textarea-primary w-full" >
                </textarea>
                </label>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    )

}