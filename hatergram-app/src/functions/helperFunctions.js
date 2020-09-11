export const createdAt = (createAt)=>{
    let nowDate = new Date()
    let createDate= new Date(createAt)
    let differenceYears = nowDate.getFullYear() - createDate.getFullYear()
    let differenceMonths = nowDate.getMonth() - createDate.getMonth()
    let differenceDays = nowDate.getDay() - createDate.getDay()
    let differenceHours = nowDate.getHours() - createDate.getHours()
    let differenceMinutes = nowDate.getMinutes() - createDate.getMinutes()

    if(differenceYears != 0 && createDate.getMonth() > nowDate.getMonth()){
        if(differenceYears === 1){
                return `${12 + differenceMonths} months ago`
            
        }
        if(differenceYears > 1){
            if( (differenceYears - 1) === 1){
                return `${differenceYears} year ago`
            }
            return `${differenceYears -1} years ago`
        }
    }

    if(differenceYears != 0 ){
        if(differenceYears === 1){
            return `${differenceYears} year ago`
        }
        return `${differenceYears} years ago`
    }

    if(differenceMonths != 0 && createDate.getDay() > nowDate.getDay()){
        if(differenceMonths === 1){
                return `${30 + differenceDays} days ago`
            
        }
        if(differenceMonths > 1){
            if( (differenceMonths - 1) === 1){
                return `${differenceMonths} month ago`
            }
            return `${differenceMonths -1} month ago`
        }
    }

    if(differenceMonths != 0){
        if(differenceMonths === 1){
            return `${differenceMonths} month ago`
        }
        return `${differenceMonths} months ago`
    }

    if(differenceDays != 0 && createDate.getHours() > nowDate.getHours()){
        if(differenceDays === 1){
                return `${24 + differenceHours} hours ago`
            
        }
        if(differenceDays > 1){
            if( (differenceDays - 1) === 1){
                return `${differenceDays} day ago`
            }
            return `${differenceDays -1} days ago`
        }
    }

    if(differenceDays != 0){
        if(differenceDays === 1){
            return `${differenceDays} day ago`
        }
        return `${differenceDays} days ago`
    }

    if(differenceHours != 0 && createDate.getMinutes() > nowDate.getMinutes()){
        if(differenceHours === 1){
            return `${60 + differenceMinutes} minutes ago`
        }
        if(differenceHours > 1){
            if( (differenceHours - 1 ) === 1){
                return `${differenceHours -1} hour ago`
            }
            return `${differenceHours -1 } hours ago`
        }
    }

    if(differenceHours != 0){
        if(differenceHours === 1){
            return `${differenceHours} hour ago`
        }
        return `${differenceHours} hours ago`
    }

    if(differenceMinutes != 0){
        
        if(differenceMinutes === 1){
            return `${differenceMinutes} minute ago`
        }
        return `${differenceMinutes} minutes ago`
    }
    if(differenceMinutes < 1){
        return "few seconds ago"
    }
}