export const  EncryptionEmail = (email: string) => {
    let input = email 
    const result1 = input.split('')
    let indexA = 0
    result1.forEach((e,index) => {if(e === '@') indexA = index})
    let result2: any[] = []
    result1.forEach((e, index) => {
        if(index > 1 && index < indexA){
            result2.push('*')
        } else {
            result2.push(e)
        }
    })

    const result3 = result2.join("")

    return result3
} 