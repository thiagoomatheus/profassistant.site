export default function MinhaContaLayout({
    account,
    children
  }: {
    children: React.ReactNode
    account: React.ReactNode
  }) {
    
    return (
        <>  
          {children}
          {account}
        </>
    )
  }