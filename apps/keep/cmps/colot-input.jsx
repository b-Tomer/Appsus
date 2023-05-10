
export function ColorInput({ name, onSetCardStyle }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']

    function onChooseColor(color) {
        const newStyle= { backgroundColor: color }
        onSetCardStyle(newStyle)
    }

    return <div className="colors-container">
            {
                colors.map(color => <div
                    className="color-item"
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onChooseColor(color)}
                ></div>)
            }
        </div>
   
}