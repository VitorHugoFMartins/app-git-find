import "./styles.css"
const ItemList = ({tittle, description}) => {
  return (
    <div className="item-list">
        <strong>{tittle}</strong>
        <p>{description}</p>
        <hr/>
    </div>
  )
}

export {ItemList}