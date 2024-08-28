const list=[
    {
        id:1,
        name:"Shopify",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
    },
    {
        id:2,
        name:"Shopify",
        img:"https://i.pcmag.com/imagery/reviews/00Z1mnZCcGR9r9D5hNbsFbW-11..v1569472690.jpg"
    },{
        id:3,
        name:"Shopify",
        img:"https://1000logos.net/wp-content/uploads/2023/01/WordPress-logo.png"
    },{
        id:4,
        name:"Shopify",
        img:"https://provenadvertising.co/wp-content/uploads/2020/01/webflow-logo.png"
    },{
        id:5,
        name:"Shopify",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
    },{
        id:6,
        name:"Shopify",
        img:"https://assets.stickpng.com/thumbs/62cc159e150d5de9a3dad5ec.png"
    },
    {
        id:7,
        name:"Shopify",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
    },{
        id:8,
        name:"Shopify",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
    },
]
const SupportedPlatfoem = () => {
  return (
    <div className="w-[700px] h-fit  bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
    <div className="flex   flex-row flex-wrap items-center justify-center">
        {
            list.map((item:any,index:any)=>{
              return(
                <div key={index} className="p-3 flex items-center justify-center rounded-md m-3 border border-[lightgray] w-[150px] h-[60px]">
                 <img className=" w-[80px] h-[50px] object-contain " src={item.img}/>
                </div>
              )
            })
        }
    </div>
    </div>
  )
}

export default SupportedPlatfoem