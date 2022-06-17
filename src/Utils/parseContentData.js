export default function(contentData){
    return Object.keys(contentData).map(key=>{
        return {
            id:key,
            ...contentData[key]
        }
    });
}