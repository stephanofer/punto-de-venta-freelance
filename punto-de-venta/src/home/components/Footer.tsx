export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t h-[80px] flex items-center justify-center ">
      <div className="text-md text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <strong
            className="cursor-pointer"
            onClick={() => {
              window.location.href = `https://github.com/stephanofer`;
            }}
          >
            Stephanofer
          </strong>
          . Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
