

export default function ConvertPrice(price: number) {
    var filter1: any
    var result: any
    if(price > 9999999999) {
        filter1 = price.toString().split('')
        for(let i = 0; i < 7; i++) {

            filter1.pop()
        }
        filter1.push('B')
        filter1.splice(-3,0,'.')
        result = filter1.join('')
    } else if(price >9999999){
        filter1 = price.toString().split('')
        for(let i = 0; i < 4; i++) {
            filter1.pop()
        }
        filter1.push('M')
        filter1.splice(-3,0,'.')
        result = filter1.join('')
    } else {
        result = price
    }


    


    return result ;
}