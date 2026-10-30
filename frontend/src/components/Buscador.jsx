function Buscador({busqueda, onCambiarBusqueda, placeholder= "Buscar..."}) {
return (
        <div className="d-flex justify-content-center gap-2">
            
            <input 
            style={{width:"500px"}}
                type="text" 
                id="buscar" 
                className="form-control form-control-md mt-5" 
                placeholder={placeholder}
                value={busqueda} 
                onChange={(e) => onCambiarBusqueda(e.target.value)} 
            />
        </div>
    );


}

export default Buscador;