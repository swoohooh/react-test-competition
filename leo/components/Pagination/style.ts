import styled from 'styled-components';

export const PaginationBox = styled.div`
  ul {
    list-style: none;
    padding: 0
  }
  
  li {
    width: 30px;
    height: 30px;
    margin: 0 1px;

    border-radius: 50%;
    border: 1px solid #cfcfcf;
    font-size: 1rem;
    
    cursor: pointer;
  }
  
  .pagination {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination li a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  .pagination li.active a {
    color: white;
  }

  .pagination li.active {
    border-color: #666;
    background-color: #666;
  }
`
