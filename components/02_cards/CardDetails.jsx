import Link from 'next/link'

export const CardDetails = ({id, title, type, trainer, difficulty, category, time, handle}) => {
    // const replaceSpaces = (str)=> {
    //     let newString = str.replace(/\s+/g, '-').toLowerCase()
    //     return newString
    // }
    return (
        <div className="details">
            <h3 className="title">{title}</h3>
            <Link href={`/trainers/${handle}`}>
                <a className="accent-txt">{trainer}</a>  
            </Link>
            <span className="secondary-accent-txt">{difficulty} • {category} • {time}</span>
        </div>
    )
}
