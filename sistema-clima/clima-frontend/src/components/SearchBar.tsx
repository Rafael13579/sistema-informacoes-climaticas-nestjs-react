interface SearchBarProps {
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        width: "40%",
        display: "flex",
        marginTop: "-20px",
        marginBottom: "40px",
      }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite o nome da cidade"
        style={{
          color: "#231e1e",
          flex: 1,
          padding: "10px",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />
      <button 
        type="submit"
        style={{
          padding: "10px 15px",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#ffffff",
          color: "#5b5959",
          cursor: "pointer",
          borderLeft: "none"
        }}
      >
        Buscar
      </button>
    </form>
  );
}
